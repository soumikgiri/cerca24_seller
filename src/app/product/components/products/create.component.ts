import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { LocationService } from '../../../shared/services';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';

@Component({
  selector: 'product-create',
  templateUrl: './form.html'
})
export class ProductCreateComponent implements OnInit {
  public product: any = {
    name: '',
    description: '',
    specifications: [],
    mainImage: null,
    metaSeo: {
      keywords: '',
      description: ''
    },
    type: 'physical',
    categoryId: '',
    isActive: true,
    freeShip: false,
    featured: false,
    hot: false,
    bestSell: false,
    price: 0,
    salePrice: 0,
    vat: 0,
    restrictFreeShipAreas: [],
    restrictCODAreas: [],
    weight: 0,
    weightType: 'kg',
    volume: 0
  };
  public isSubmitted: any = false;
  public tree: any = [];
  public countries: any = [];
  public states: any = [];
  public cities: any = [];
  public zipCode: any = '';
  public freeCountry: any;
  public freeState: any;
  public freeCity: any;
  public newSpecification: any = {
    key: '',
    value: ''
  };
  public imageUrl: string = '';
  public images: any = [];
  public mainImage: string = '';
  public tab = 'info';
  public freeShipAreas: any = [];
  public dealDate: any;
  public imagesOptions: any = {
    multiple: true
  };
  public fileType: any = '';
  public fileOptions: any = {};

  constructor(private router: Router, private categoryService: ProductCategoryService,
    private productService: ProductService, private toasty: ToastyService, private location: LocationService) {
  }

  ngOnInit() {
    this.fileOptions = {
      isDigital: true,
      url: window.appConfig.apiBaseUrl + '/media/files',
      onFinish: (resp) => {
        if (resp.data.mimeType.indexOf('zip') > -1) {
          this.fileType = 'zip';
        } else if (resp.data.mimeType.indexOf('rar') > -1) {
          this.fileType = 'rar';
        } else if (resp.data.mimeType.indexOf('pdf') > -1) {
          this.fileType = 'pdf';
        } else {
          this.fileType = 'file';
        }
        this.product.digitalFileId = resp.data._id;
        this.product.digitalFile = resp.data;
      }
    };
    this.location.countries().then((resp) => {
      this.countries = resp.data;
    });

    this.categoryService.tree()
      .then(resp => (this.tree = this.categoryService.prettyPrint(resp.data)));

  }

  submit(frm: any) {
    this.isSubmitted = true;
    if (frm.invalid) {
      return this.toasty.error('Form is invalid, please try again.');
    }

    if (this.product.salePrice > this.product.price || this.product.salePrice < 0.1 || this.product.price < 0.1) {
      return this.toasty.error('Price or sale price is invalid.');
    }

    if (this.product.dailyDeal && this.dealDate) {
      this.product.dealTo = new Date(this.dealDate.year, this.dealDate.month, this.dealDate.day).toUTCString();
    }

    if (this.product.type === 'digital' && !this.product.digitalFileId) {
      return this.toasty.error('Please select Digital file path!');
    }

    if (!this.product.categoryId) {
      return this.toasty.error('Please select category!');
    }

    if (!this.product.weight || this.product.weight < 0) {
      return this.toasty.error('Weight is invalid.')
    }

    if (!this.product.volume || this.product.volume < 0) {
      return this.toasty.error('Volume is invalid.')
    }

    this.freeShipAreas.forEach((item) => {
      const data = _.pick(item, ['areaType', 'value', 'name']);
      this.product.restrictFreeShipAreas.push(data);
    });
    this.product.images = this.images.map(i => i._id);
    this.product.mainImage = this.mainImage || null;
    console.log(this.product);
    this.productService.create(this.product)
      .then(() => {
        this.toasty.success('Product has been created');
        this.router.navigate(['/products/list']);
        console.log(this.product);
      }, err => this.toasty.error(err.data.message || 'Something went wrong!'));
  }

  changeAlias() {
    this.product.alias = this.product.name.split(' ').join('-');
  }

  addSpecification() {
    if (!this.newSpecification.value.trim()) {
      return this.toasty.error('Please enter specification value');
    }
    this.product.specifications.push(this.newSpecification);
    this.newSpecification = { key: '', value: '' };
  }

  selectImage(media: any) {
    // this.product.mainImage = media._id;
    // this.imageUrl = media.fileUrl;
    if (media.type !== 'photo') {
      return this.toasty.error('Please select image!');
    }

    this.images.push(media);
  }

  // selectDigital(media: any) {
  //   this.product.digitalFileId = media._id;
  //   this.product.digitalFile = media;
  //   if (media.mimeType.indexOf('image') === 0) {
  //     this.fileType = 'image';
  //   } else if (media.mimeType.indexOf('audio') === 0) {
  //     this.fileType = 'audio';
  //   } else if (media.mimeType.indexOf('video') === 0) {
  //     this.fileType = 'video';
  //   } else {
  //     this.fileType = 'file';
  //   }
  // }

  setMain(media: any) {
    this.mainImage = media._id;
  }

  removeImage(media: any, index: any) {
    if (media._id === this.mainImage) {
      this.mainImage = null;
    }
    this.images.splice(index, 1);
  }

  changeTab(tab: string) {
    this.tab = tab;
  }

  // loadStates(COD: any) {
  //   this.location.states({ country: COD }).then((res) => {
  //     this.states = res.data;
  //   });
  // }

  // loadCities(id: any) {
  //   this.location.cities({ state: id }).then((res) => {
  //     this.cities = res.data;
  //   });
  // }

  // addFreeShipAreas() {
  //   if (this.zipCode) {
  //     const data = {
  //       areaType: 'zipcode',
  //       value: this.zipCode
  //     };
  //     this.freeShipAreas.push(data);
  //     this.zipCode = '';
  //   } else if (!this.zipCode && this.freeCountry && !this.freeState) {
  //     const data = {
  //       areaType: 'country',
  //       value: this.freeCountry.isoCode,
  //       name: this.freeCountry.name
  //     };
  //     this.freeShipAreas.push(data);
  //     this.freeCountry = {};
  //   } else if (!this.zipCode && this.freeCountry && this.freeState && !this.freeCity) {
  //     const data = {
  //       areaType: 'state',
  //       value: this.freeState._id,
  //       name: this.freeState.name
  //     };
  //     this.freeShipAreas.push(data);
  //     this.freeState = {};
  //   } else if (!this.zipCode && this.freeCountry && this.freeState && this.freeCity) {
  //     const data = {
  //       areaType: 'city',
  //       value: this.freeCity._id,
  //       name: this.freeCity.name
  //     };
  //     this.freeShipAreas.push(data);
  //     this.freeCity = {};
  //   }
  // }

  // removeArea(item: any, index: number) {
  //   this.freeShipAreas.splice(index, 1);
  // }

  removeSpec(i: number) {
    this.product.specifications.splice(i, 1);
  }

  updateDealTime() {
    this.product.dealTo = new Date(this.dealDate.year, this.dealDate.month - 1, this.dealDate.day);
  }
}
