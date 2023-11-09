import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';
  constructor( private countriesService: CountriesService){}

  ngOnInit(): void {
    // Asignando countries a los countries que guardamos en el servicio.
    this.countries = this.countriesService.cacheStore.byCapital.countries

    this.initialValue = this.countriesService.cacheStore.byCapital.term
  }

  searchByCapital(term: string):void{
    // console.log('Desde ByCapitalPage');
    // console.log({term});

    this.isLoading = true;
    // Estamos llamando el metodo del servicio
    this.countriesService.searchCapital(term).subscribe( countries => {
      this.countries = countries;
      this.isLoading = false;
    })
    console.log({term});
  }
}
