import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit{

  public country?: Country;

  // Inyectar servicion : 1, Activated route
  // Hay unos sin observable, hay otros de que toman captura de como se encuentra el observable de como se encuetra al url y no es un observable.
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private CountriesService: CountriesService
  ){}
  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap( ({id}) => this.CountriesService.searchContryByAlphaCode(id)),
    ).subscribe(
      (country) => {

        // this.searchCountry(id)

        // this.CountriesService.searchContryByAlphaCode(id).subscribe(
        //   country => {
        //     console.log({country});
        //   }
        // )
        // console.log({params: id});


        // Si country no existe entonces lo sacare de la pagina
        if (!country) return this.router.navigateByUrl('')
        return this.country = country;
      }
    )
  }

  // searchCountry(code: string){
  //   this.CountriesService.searchContryByAlphaCode(code).subscribe(
  //     country => {
  //       console.log({country});
  //     }
  //   )
  // }
}
