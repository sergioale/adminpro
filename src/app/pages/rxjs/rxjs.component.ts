import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';
import { rendererTypeName } from '@angular/compiler';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscripcion: Subscription;

  constructor() {

    this.subscripcion = this.regresaObservable()
      .subscribe(
        numero => console.log(numero)
       , error => console.log('Error en obs', error)
       , () => console.log('El observador termino')
      );

     }

  ngOnInit() {
  }

  ngOnDestroy(){
    console.log('La pagina se va a cerrar');
    this.subscripcion.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next(contador);

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if ( contador === 2){
        //   clearInterval(intervalo);
        //   observer.error('Auxilio');
        // }

      }, 1000);
    }).pipe(
      map( resp => {
          return resp.valor;
      }),
      filter( (valor, index) => {

        if ( (valor % 2) === 1 ){
          //impar
          return true;
        }
         return false;
      })
    );

  }

}
