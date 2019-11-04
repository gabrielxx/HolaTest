import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NewsService, News } from '../../../../providers/news.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

declare var $;


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.less']
})
export class NewsComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;

  public news: Observable<any[]>;

  public formNews = new FormGroup({
    title: new FormControl('', Validators.required),
    subtitle: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)

  });


  constructor(private _newsService: NewsService) { }

  ngOnInit() {
    this.onLoadNews()
  }
  onLoadNews() {
    this.news = this._newsService.onLoadNews();
  }
  onSaveNew() {
    Swal.fire({
      text: 'Desea registrar esta Noticia?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'

    }).then((result) => {
      if (result.value) {
        this._confirmSaveNew()
      }
    })
  }
  _confirmSaveNew(){
    this._newsService.onSaveNew(this.formNews.value,
      () => {
        Swal.fire("Noticia!", "Noticia Registrada exitosamente!", "success");
        this._onCloseModal()

      },
      () => Swal.fire("Noticia!", "La Noticia no ha sido registrada!", "error")
    )
  }
  _onCloseModal() {
    this.formNews.reset();
    let modal = $(this.modal.nativeElement);
    modal.modal('hide');
  }
  onDeleteNew(News) {
    Swal.fire({
      text: 'Desea eliminar esta Noticia?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'

    }).then((result) => {
      if (result.value) {
        this._onConfirmDelete(News.id)
      }
    })
  }
  _onConfirmDelete(id) {
    this._newsService.onDeleteNews(id,
      () => {
        Swal.fire('Eliminado!','La Noticia ha sido eliminada exitosamente.','success')
      },
      () => {
        Swal.fire('Eliminado!', 'La Noticia no ha sido eliminada.', 'error' )
      })
  }
}
