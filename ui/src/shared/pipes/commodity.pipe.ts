import { Pipe, PipeTransform } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Commodity } from '../models/Commodity';
import { ReferenceDataStore } from '../services/ref-data-store';

@Pipe({name: 'commoditypipe'})
export class CommodityPipe implements PipeTransform{
        
    private _commodities: Map<string, string> = new Map();
    // private _promise = this._refservice.getAllCommodities().toPromise();

    constructor(private refDataStore: ReferenceDataStore){
        this.refDataStore.getCommodities()
                            .forEach((c:Commodity)=> this._commodities.set(c.code, c.description));
        // this._promise.then(
        //     (data: Commodity[])=>{
        //         data.forEach( (c:Commodity)=> this._commodities.set(c.code, c.description));
        //     }
        // );
        // this._refservice.getAllCommodities().subscribe();
    }



  transform(value: string, args: string[]): any {
    if (!value) return value;
    return this._commodities.get(value);
  }
}