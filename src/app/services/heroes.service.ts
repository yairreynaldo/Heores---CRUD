import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { delay, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = "https://crud-angular-917b2-default-rtdb.firebaseio.com"

  constructor(private httpCli: HttpClient) { }

  crearHeroe(heroe: HeroeModel) {
    return this.httpCli.post(`${this.url}/heroes.json`, heroe)
          .pipe(
             map((resp: any) => {
              heroe.id = resp.name;
              return heroe;
            })
          )
  }

  actualizarHeroe(heroe: HeroeModel) {
    const heroeTemp = {
      ...heroe
    }

    delete heroeTemp.id;

    return this.httpCli.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  getHeroes() {
    return this.httpCli.get(`${this.url}/heroes.json`)
          .pipe(
            map(this.crearArreglo),
            delay(700)
          )
  }

  private crearArreglo(heroeObj: any){
    
    const heroes:HeroeModel[] = [];

    if(heroeObj === null){return []}

    Object.keys(heroeObj).forEach(key => {
      const heroe: HeroeModel = heroeObj[key];
      heroe.id = key;
      heroes.push(heroe);
    })

    return heroes;

  }

  getHeroe(id: string) {
    return this.httpCli.get(`${this.url}/heroes/${id}.json`);
  }

  borrarHeroe(id: string) {
    return this.httpCli.delete(`${this.url}/heroes/${id}.json`);
  }

}
