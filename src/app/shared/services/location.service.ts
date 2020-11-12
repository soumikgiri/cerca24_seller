import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

@Injectable()
export class LocationService {
  constructor(private restangular: Restangular) { }
  countries(): Promise<any> {
    return this.restangular.one('countries').get().toPromise();
  }

  states(params: any): Promise<any> {
    return this.restangular.one('states').get(params).toPromise();
  }

  cities(params: any): Promise<any> {
    return this.restangular.one('cities').get(params).toPromise();
  }

  getCitiesZambia() {
    return [
      {
        "name": "Chadiza",
        "areas": ["Central Business District"]
      },
      {
        "name": "Chama",
        "areas": ["Central Business District"]
      },
      {
        "name": "Chavuma",
        "areas": ["Central Business District"]
      },
      {
        "name": "Chembe",
        "areas": ["Central Business District"]
      },
      {
        "name": "Chibombo",
        "areas": ["Central Business District"]
      },
      {
        "name": "Chiengi",
        "areas": ["Central Business District"]
      },
      {
        "name": "Chikankata",
        "areas": ["Central Business District"]
      },
      {
        "name": "Chilanga",
        "areas": ["Central Business District"]
      },
      {
        "name": "Chililabombwe",
        "areas": ["Central Business District", "Kasumbalesa"]
      },
      {
        "name": "Chilinda",
        "areas": ["Central Business District"]
      },
      {
        "name": "Chilubi",
        "areas": ["Central Business District"]
      },
      {
        "name": "Chingola",
        "areas": [
          "Central Business District",
          "Chabanyama",
          "Chawama",
          "Chibwe",
          "Chikola A",
          "Chikola B",
          "Chingola East",
          "Chiwempala",
          "Kabundi",
          "Kabundi East",
          "Kabundi North",
          "Kabuta",
          "Kapisha",
          "Kasompe",
          "Lulamba",
          "Maiteneke",
          "Mimbula",
          "Nchanga North",
          "Twatasha"
        ]
      },
      {
        "name": "Chinsali",
        "areas": ["Central Business District"]
      },
      {
        "name": "Chipata",
        "areas": ["Central Business District", "Mwami Border"]
      },
      {
        "name": "Chipili",
        "areas": ["Central Business District"]
      },
      {
        "name": "Chirundu",
        "areas": ["Central Business District"]
      },
      {
        "name": "Chisamba",
        "areas": ["Central Business District"]
      },
      {
        "name": "Chitambo",
        "areas": ["Central Business District"]
      },
      {
        "name": "Choma",
        "areas": ["Central Business District"]
      },
      {
        "name": "Chongwe",
        "areas": ["Central Business District"]
      },
      {
        "name": "Gwembe",
        "areas": ["Central Business District"]
      },
      {
        "name": "Ikelenge",
        "areas": ["Central Business District"]
      },
      {
        "name": "Isoka",
        "areas": ["Central Business District"]
      },
      {
        "name": "Itezhi-Tezhi",
        "areas": ["Central Business District"]
      },
      {
        "name": "Kabompo",
        "areas": ["Central Business District"]
      },
      {
        "name": "Kabwe",
        "areas": [
          "Central Business District",
          "Chikusu",
          "Chowa",
          "Highridge",
          "Katondo",
          "Luangwa",
          "Pollen",
          "Railway"
        ]
      },
      {
        "name": "Kafue",
        "areas": ["Central Business District"]
      },
      {
        "name": "Kalabo",
        "areas": ["Kafue Estates"]
      },
      {
        "name": "Kalomo",
        "areas": ["Central Business District"]
      },
      {
        "name": "Kalulushi",
        "areas": [
          "Central Business District",
          "Chambishi",
          "Chibuluma",
          "Depot",
          "NAPSA Complex",

        ]
      },
      {
        "name": "Kalumbila",
        "areas": ["Central Business District"]
      },
      {
        "name": "Kanchibiya",
        "areas": ["Central Business District"]
      },
      {
        "name": "Kaoma",
        "areas": ["Central Business District", "Mankoya"]
      },
      {
        "name": "Kapiri Mposhi",
        "areas": ["Central Business District"]
      },
      {
        "name": "Kaputa",
        "areas": ["Central Business District"]
      },
      {
        "name": "Kasama",
        "areas": ["Central Business District", "Chaiwila"]
      },
      {
        "name": "Kasempa",
        "areas": ["Central Business District"]
      },
      {
        "name": "Katete",
        "areas": ["Central Business District"]
      },
      {
        "name": "Kawambwa",
        "areas": ["Central Business District", "Munkanta"]
      },
      {
        "name": "Kazungula",
        "areas": ["Central Business District"]
      },
      {
        "name": "Kitwe",
        "areas": [
          "Buchi",
          "Bulangililo",
          "Buyantanshi",
          "CBU",
          "Central Business District",
          "Chachacha",
          "Chamboli",
          "Chimwemwe",
          "Chipata",
          "CPC Village",
          "Garnetone",
          "Ipusukilo",
          "Kabala",
          "Kamitondo",
          "Kamfinsa",
          "Kawama/Kamatipa",
          "Kitwe West",
          "Kwacha",
          "Luangwa",
          "Malembeka",
          "Mindolo",
          "Mindolo North",
          "Miseshi",
          "Mulenga",
          "Musondo",
          "Natwange",
          "Ndeke",
          "Ndeke Village",
          "Nkana East",
          "Nkana West",
          "Nkandabwe",
          "Parkands",
          "Riverside",
          "Race Course",
          "Twatasha",
          "Wusakile"
        ]
      },
      {
        "name": "Lavushimanda",
        "areas": ["Central Business District"]
      },
      {
        "name": "Limulunga",
        "areas": ["Central Business District"]
      },
      {
        "name": "Livingstone",
        "areas": [
          "Airport",
          "Burton",
          "Burton Extension",
          "Central Business District",
          "Chibelenga",
          "Dambwa",
          "Dambwa Central",
          "Dambwa Site & Service",
          "Dambwa South",
          "Elaine Brittel",
          "Falls View",
          "Highlands",
          "Hillcrest",
          "Kashitu",
          "Kashitu Extension",
          "Libuyu",
          "Linda",
          "Malota",
          "Maramba",
          "Muhdolobela",
          "Mwandi",
          "Nakatindi",
          "Ngwenya",
          "Nott Brodie",
          "Railways",
          "Victoria Falls",
          "Zakeyo",
          "Zambezi Sawmills",
          "Zecco"
        ]
      },
      {
        "name": "Luampa",
        "areas": ["Central Business District"]
      },
      {
        "name": "Luangwa",
        "areas": ["Central Business District"]
      },
      {
        "name": "Luano",
        "areas": ["Central Business District"]
      },
      {
        "name": "Luanshya",
        "areas": ["Central Business District"]
      },
      {
        "name": "Lufwanyama",
        "areas": ["Central Business District"]
      },
      {
        "name": "Lukulu",
        "areas": ["Central Business District"]
      },
      {
        "name": "Lundazi",
        "areas": ["Central Business District"]
      },
      {
        "name": "Lunga",
        "areas": ["Central Business District"]
      },
      {
        "name": "Lunte",
        "areas": ["Central Business District"]
      },
      {
        "name": "Lusaka",
        "areas": [
          "Avondale",
          "Bauleni",
          "Balastone",
          "CBD",
          "Cathedral Hill",
          "Central Business District",
          "Chalala",
          "Chaisa",
          "Chamba Valley",
          "Chingwere",
          "Chawama",
          "Chainda",
          "Chelstone",
          "Chibolya",
          "Chilanga",
          "Chilenje",
          "Chilenje South",
          "Chilulu",
          "Chinika",
          "Chunga",
          "Churdleigh",
          "Emmasdale",
          "Foxdale",
          "Garden",
          "Handsworth Park",
          "Helen Kaunda",
          "Ibex Hill",
          "Ibex Meanwood",
          "Jesmondine",
          "John Lang",
          "Kabangwe",
          "Kabulonga",
          "Kabwata",
          "Kalingalinga",
          "Kalundu",
          "Kamanga",
          "Kamwala",
          "Kamwala South",
          "Kaunda Square Stage 1",
          "Kaunda Square Stage 2",
          "KK International Airport",
          "Libala",
          "Lilayi",
          "Longacres",
          "Luburma",
          "Luneta",
          "Lusaka West",
          "Makeni Bonaventure",
          "Marshlands",
          "Maluba",
          "Mandevu",
          "Matero",
          "Ngombe",
          "Ngwerere",
          "Mazyopa",
          "Meanwood Airport",
          "Meanwood Ibex",
          "Meanwood Kwamwena",
          "Meanwood Ndeke",
          "Meanwood Vorna Valley",
          "Mutendere",
          "Munali",
          "Kamanga",
          "Namununga",
          "New Kasama",
          "Northmead",
          "Olympia Park",
          "PHI",
          "Rhodes Park",
          "Ridgeway",
          "Roma Park",
          "Roma",
          "Sunningdale",
          "Silverest",
          "Thorn Park",
          "Tunkuka",
          "Villa Elizabeth",
          "Woodlands"
        ]
      },
      {
        "name": "Luwingu",
        "areas": ["Central Business District"]
      },
      {
        "name": "Mafinga",
        "areas": ["Central Business District"]
      },
      {
        "name": "Mambwe",
        "areas": ["Central Business District"]
      },
      {
        "name": "Mansa",
        "areas": ["Central Business District"]
      },
      {
        "name": "Manyinga",
        "areas": ["Central Business District"]
      },
      {
        "name": "Masaiti",
        "areas": ["Central Business District"]
      },
      {
        "name": "Mazabuka",
        "areas": ["Central Business District"]
      },
      {
        "name": "Mbala",
        "areas": ["Central Business District"]
      },
      {
        "name": "Milengi",
        "areas": ["Central Business District"]
      },
      {
        "name": "Mitete",
        "areas": ["Central Business District"]
      },
      {
        "name": "Mkushi",
        "areas": ["Central Business District"]
      },
      {
        "name": "Mongu",
        "areas": ["Central Business District"]
      },
      {
        "name": "Monze",
        "areas": ["Central Business District"]
      },
      {
        "name": "Mpika",
        "areas": ["Central Business District"]
      },
      {
        "name": "Mpongwe",
        "areas": ["Central Business District"]
      },
      {
        "name": "Mporokoso",
        "areas": ["Central Business District"]
      },
      {
        "name": "Mpulungu",
        "areas": ["Central Business District"]
      },
      {
        "name": "Mufulira",
        "areas": [
          "Butondo",
          "Central Business District",
          "Eastlea",
          "Fairview",
          "Kamuchanga",
          "Kwawama/Francis",
          "Kawama/kansuswa",
          "Kansuswa",
          "Kankoyo",
          "Mokambo",
          "Mutundu",
          "Mine Area",
          "Mupambe"
        ]
      },
      {
        "name": "Mufumbwe",
        "areas": ["Chibolya"]
      },
      {
        "name": "Mulobezi",
        "areas": ["Central Business District"]
      },
      {
        "name": "Mumbwa",
        "areas": ["Central Business District"]
      },
      {
        "name": "Mungwi",
        "areas": ["Central Business District"]
      },
      {
        "name": "Mushindano",
        "areas": ["Central Business District"]
      },
      {
        "name": "Mwandi",
        "areas": ["Central Business District"]
      },
      {
        "name": "Mwansabombwe",
        "areas": ["Central Business District"]
      },
      {
        "name": "Mwense",
        "areas": ["Central Business District"]
      },
      {
        "name": "Mwinilunga",
        "areas": ["Central Business District"]
      },
      {
        "name": "Nakonde",
        "areas": ["Central Business District"]
      },
      {
        "name": "Nalolo",
        "areas": ["Central Business District"]
      },
      {
        "name": "Namwala",
        "areas": ["Central Business District"]
      },
      {
        "name": "Nchelenge",
        "areas": ["Central Business District"]
      },
      {
        "name": "Ndola",
        "areas": [
          "Bwana Mukubwa",
          "Chifubu",
          "Chipulukusu",
          "Chichele/ Kasongo",
          "Chinese Complex",
          "Dag-Hammarskjold",
          "Dola Hill",
          "Hillcrest",
          "Jacaranda Area",
          "Industrial Area",
          "Itawa",
          "Kabushi",
          "Kafulafuta",
          "Kanini",
          "Kaniki/Sakania",
          "Kaloko",
          "Kanseshi",
          "Kantolomba",
          "Kawama",
          "Kavu",
          "Luanshya Turn-off",
          "Lubuto",
          "Mandondo",
          "Masala Mine",
          "Masala Skyways",
          "Masala Main",
          "Masangano",
          "Mundawanga",
          "Mushili Bonano",
          "Mushili Old",
          "Mushili New",
          "Mushili Kansengu",
          "Minsundu",
          "Mitengo",
          "Ndeke",
          "New Airport",
          "Nkwazi ",
          "Northrise",
          "Pamodzi",
          "Pamodzi Overspill",
          "Sakanya Border",
          "Targagun",
          "Twapia"
        ]
      },
      {
        "name": "Ngabwe",
        "areas": ["Central Business District"]
      },
      {
        "name": "Nkeyema",
        "areas": ["Central Business District"]
      },
      {
        "name": "Nsama",
        "areas": ["Central Business District"]
      },
      {
        "name": "Nyimba",
        "areas": ["Central Business District"]
      },
      {
        "name": "Pemba",
        "areas": ["Central Business District"]
      },
      {
        "name": "Petauke",
        "areas": ["Central Business District"]
      },
      {
        "name": "Rufunsa",
        "areas": ["Central Business District"]
      },
      {
        "name": "Samfya",
        "areas": ["Central Business District"]
      },
      {
        "name": "Senanga",
        "areas": ["Central Business District"]
      },
      {
        "name": "Senga Hill",
        "areas": ["Central Business District"]
      },
      {
        "name": "Serenje",
        "areas": ["Central Business District"]
      },
      {
        "name": "Sesheke",
        "areas": ["Central Business District"]
      },
      {
        "name": "Shang'ombo",
        "areas": ["Central Business District"]
      },
      {
        "name": "Shibuyunji",
        "areas": ["Central Business District"]
      },
      {
        "name": "Shiwang'andu",
        "areas": ["Central Business District"]
      },
      {
        "name": "Siavonga",
        "areas": ["Central Business District"]
      },
      {
        "name": "Sikongo",
        "areas": ["Central Business District"]
      },
      {
        "name": "Sinazongwe",
        "areas": ["Central Business District"]
      },
      {
        "name": "Sinda",
        "areas": ["Central Business District"]
      },
      {
        "name": "Sioma",
        "areas": ["Central Business District"]
      },
      {
        "name": "Solwezi",
        "areas": ["Central Business District"]
      },
      {
        "name": "Vubwi",
        "areas": ["Central Business District"]
      },
      {
        "name": "Zambezi",
        "areas": ["Central Business District"]
      },
      {
        "name": "Zimba",
        "areas": ["Central Business District"]
      }
    ]
  }

}
