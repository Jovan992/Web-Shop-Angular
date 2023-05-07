export class Product{

constructor(imgSrc: string, name: string, price: number, desc: string, id: number, cat: string){
    this.imgSrc = imgSrc;
    this.name = name;
    this.price = price;
    this.description = desc;
    this.id = id;
    this.category = cat;
}

public imgSrc: string;
public name: string;
public price: number;
public description: string;
public id: number;
public category: string;
}

