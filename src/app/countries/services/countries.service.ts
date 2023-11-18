import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country.interface';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl:string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries:[]},
    byCountries: { term: '', countries:[]},
    byRegion: { region: '', countries:[]},
  }

  constructor(private http: HttpClient) {
    // Cargando informacion del localStore
    this.loadFromLocalStorage();
  }

  // Metodo para guardar en el localStorage
  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(){
    if (!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]>{
    return this.http.get<Country[]>(url).pipe(
      catchError(() => of([])),
      delay(500),
    )
  }

  // Este metodo ya que devuelve  un [] con many elements, entonces le decimos que lo recorra y que siempre muestre el primer elemento del arreglo
  searchContryByAlphaCode(code: string): Observable<Country | null>{
    const urlCountry = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(urlCountry).pipe(

      // De mis paises quiero que me retornes el de la posicion 0, si no retorna un Null
      map(countries => countries.length > 0 ? countries[0] : null),
      catchError(() => of(null))
    );
  }

  searchCapital(term: string): Observable<Country[]>{

    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url).pipe(
      tap(countries => this.cacheStore.byCapital = {term, countries}),
      tap(() => this.saveToLocalStorage()),
    );
  }

  searchCountry(term: string): Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url).pipe(
      tap(countries => this.cacheStore.byCountries = {term, countries}),
      tap(() => this.saveToLocalStorage()),
    )
  }

  searchRigion(region: Region): Observable<Country[]>{
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url).pipe(
      tap(countries => this.cacheStore.byRegion = {region, countries}),
      tap(() => this.saveToLocalStorage()),
    )
  }
}
