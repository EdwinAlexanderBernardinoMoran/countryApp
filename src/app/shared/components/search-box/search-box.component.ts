import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime, delay } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})

// El OnInit se inicializa cuando el componente se inicializa y especificamente es despues del constructor.

export class SearchBoxComponent implements OnInit{

  // Un Subject es un tipo especial de Observable
  private debouncer: Subject<string> = new Subject<string>()

  @Input()
  public placeholder: string = '';

  // Event Emiter
  @Output()
  public onValue = new EventEmitter<string>()

  @Output()
  public onDebounce = new EventEmitter<string>()

  ngOnInit(): void {
    this.debouncer.pipe(
      debounceTime(1000)
    ).subscribe(value => {
      this.onDebounce.emit(value)
    })
  }

  public emitValue(value: string):void{
    this.onValue.emit(value)
  }

  onKeyPress(searchTerm: string){
    // console.log(searchTerm);
    this.debouncer.next(searchTerm);
  }
}
