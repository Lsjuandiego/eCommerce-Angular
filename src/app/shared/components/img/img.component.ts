import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  img: string = '';

  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
    console.log('change just img', this.img);
    //code
  }
  @Input() alt: string = '';
  // En este caso en EventEmitter va a transmitir un string porque se quiere saber
  //que se cargo la imagen pero quiero saber cual imagen se cargó (url)
  //El event emiter puede tener strings, numeros, objetos, etc
  @Output() onload = new EventEmitter<string>();

  imgDefault: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAALVBMVEX////h4eHg4OD6+vrs7Oz39/fp6en5+fn09PTk5OTv7+/n5+fu7u7d3d3Z2dlR+A8UAAAGHElEQVR4nO2d2bajIBBFmWTU/v/P7SqMZlKDiUJ5V+2HXtfWGN05IBCDQjAMwzAMwzAMwzAMwzAMwzAMwzAMwzAM0wrt+xBkW4L1rqGBXioSSNs1UuCHoXEEZtRgmijowT8dlNX1FUQyIRhRoboCTykEGdXXdiDJOZDK11UQ6SmoXhrC3cF0fWp3ZZwYqlaLTt0NhMbcS+UQazqYa0Qlo25MN2dSVW0kmPltq6pfRs8HE2oWBju/batG6iNzENgBwA7YATtgB+yAHRB1oLWPMfqu0iERdKBNuHWggq3SnSXnQFv12KcMFSxQc+DD8zCjqjC8Q8xBfB9fOn+0k5YDvzTEdnqXlpSDRQXnS6DkQIdFBaePdlJy0K8NtJ48uEHIwWoMzh5uIuRgY7z93GFvQg7sugOpzjw6Qg7Wi4KUw5m1Ih0Het3AF0P/fkeHlI6Dbuvrt71NhE6F8ptL/qYDj1+hFSfhKg529Zw67HeVJ4GOA73lYFd94Meup5KFEug4OOy64KfetwplxYGQg4PaB/4+AFGYBEIONm7PUbZ41099z7IkEHJwSH/hpftdlARCDtY7DCqV7ti/3vBXcomk5GA1CMU14sIgjPp8YpQcCLcsobgkvKWgLAmkHPw4nrg2FPepsUTLgegWwlzaRFxMQUkSiDkQ3UtxUMUFoVu///lDEqg5EKIPw9zQU8qWNvpXUzAmYWs39BwIHVMYb54Mprjvt6ngQ2OJoANAO+99t+PnJR8UbCeBpoO9fFSwmYQ/4WDloliahL/goCAFo4SVN/sDDopSsJWE6zsoTMFGEi7vYIeCtcbS1R3sUrCShIs72KlgOQnXdlBcHW4m4dIOdqdgTMLre17AQb82ivRFCsYkvBQH+g6MkssSvkrBUhLIO+jVymX9yxQsJIG6g/zrr6UkfJ0C+bZD4g5uP4BT7/ez/var+ack0HZgph/Hq5fb835U8DxQS9qBuZ/oc53ws4KnkVrKDszjFAmPRfh3BVdxYJ5P9J6EAxRcxMHbXatTEo5QcA0H5v1ERwmHKLiEg8V7l7E4HKPgCg4WUjBKsAdNIkLfwYoCbCccYuACDlYVHAd1BxUUUHdgasweRdtBjRQQd1AlBbQd1EkBaQe1FBB2UE0BXQf1FJB1UFEBVQc1FRB14KtOrEnUQc0YsAN2wA7YATtgB+yAHbADdsAOruVgqDrDOE0HsuoM4yQdtIMdsAOEHbADhB2wA4QdtHdQ+XlAi8zt56rPoJhnPqn7tsvMt8DtmH3nAO7zgqlgGpPux1L1SV2P8wRW7SktMR/JqZM0vlP1u8VClKyq4OEhVXSo/pyk1XmEm1E+EdVhbM0Q1wKlGjzVdWuqwPrsmHbzQLQl9CTPoXS+yaPBZy0QCAMeRPVneM5oH4IaWiND37ix6rrGNHzANcMwDMMwJXQWgEabf+7HbrZh1lfqINzcArzt0lV9gPE3RGWiUVLEpwew6K0+Xbc+D7lOws9jxXYcLfTq96M8l4iH7JWOyefpcFzsO/yP6ISO0wQ5zk0rY4cjEX48Td/DJ+0dNsFhR7ggfHbg8iuNza/yUjzsiiLZQQQHQ7CDFX4IaYg64eP7lLS3YY6EKyOsTGnwepr6KkgrpTDwMVuZF6Ag/BOdxO1wc3PbpRRufD1VvLLGqoAaRB9ESPmMtOrgfxycTe7k26Ax2XllmNKurcYAOdhERVyIeLLZAdQAyYCDbBccwItG2TTxyvSY4pjwMIXEdA+5PkiYgXHID04IHGj8fgbOurudTWeSAnPJONi6s0ndHIAaGwZwkHA824MyHL1RA9m+0vTxTA762QF+eHoc/b45yIJmB37oHUYiBptwQfvJgZVeYw4CDuVmBwYfdd/wLLd5cWBhESKvId0ezr8f8tpkcy0PKzWs9OP3dXHAEXsN2+YNcxmC+gBOWVrhJJYFhxvAdaGXDmpSumUh3RxY/BsqOkBjfeeFkeE2GQg2IIyBq39eqUMeCsSlhLmBcxcuL0SnRJfAJW7oevwXatKAm4Qmw4dfosdiq/Ofrx+d1vNKAFbreYtxQc/70Pd9Pf3FMAzDMAzDMAzDMAzDMAzDMAzThv9M9GD0LcQ/UAAAAABJRU5ErkJggg==';

  // counter = 0;
  // counterFn: number | undefined;
  constructor() {
    //before render
    //No async -- once time
    console.log('constructor', 'imgValue => ', this.img);
  }

  // corre antes del render y su objetivo es estar actualizando
  // los cambios en los inputs. Corre las veces que actualicemos
  // los inputs de los componentes
  ngOnChanges(changes: SimpleChanges) {
    //before - during render
    //changes inputs -- times
    console.log('ngOnChanges', 'imgValue => ', this.img);
    console.log('changes', changes);
  }

  // corre antes del render, se pueden correr cosas async, llamados a API
  // corre solo una vez
  ngOnInit(): void {
    //before render
    //async - fetch -- once time
    console.log('ngOnInit', ' imgValue =>', this.img);

    //función que corra cada segundo y lo mostramso con un h3 en el html de img.component
    // this.counterFn = window.setInterval(() => {
    //   this.counter += 1;
    //   console.log('run counter');
    // },1000);
  }

  //  corre despues de que todo se este renderizando, manejamos los hijos del
  //  componente (ejemplo la imagen, el ng template (en el  .html))
  ngAfterViewInit() {
    //after render
    //handler children
    console.log('ngAfterViewInit');
  }

  //cuando se elimina el componente
  //ejemplo: un ngIf crea un componente y cuando lo quitamos
  //se remueve de la interfaz, el componente y la instancia dejan de existir
  ngOnDestroy() {
    //delete
    console.log('ngOnDestroy');
    // window.clearInterval(this.counterFn);
  }

  imgError() {
    this.img = this.imgDefault
  }

  imgLoaded() {
    console.log('log hijo');
    this.onload.emit(this.img);
  }
}
