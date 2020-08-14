import img1 from './img/birmingham.png';
import img2 from './img/brabantRedHouses.png';
import img3 from './img/edmontonAB.jpg';
import img4 from './img/field.png';
import img5 from './img/tokyo.png';
import img6 from './img/greenland.png';
import img7 from './img/soton.png';
import img8 from './img/stantonCA.png';


class CardFetchingService {
    constructor(){
        this.init();
        
    }

    init(){
        
        //this.images = [img1, img2, img3, img4, img5, img6, img7, img8];
    }

    async getCards(q){
        const resp = await fetch("/api/img?q=" + encodeURIComponent(q))
        this.images = resp.json();
        console.log(resp);
        return this.images;
    }
}

export default CardFetchingService;