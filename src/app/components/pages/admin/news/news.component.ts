import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NewsService, News } from '../../../../providers/news.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2'

declare var $;


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.less']
})
export class NewsComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;
  @ViewChild('datatable') table: ElementRef;
  dataTable: any;

  public news: Observable<any[]>;
  public fileUpload;
  public isNew: boolean;
  public formNews = new FormGroup({
    id: new FormControl(),
    title: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9 ]+$/),
    ]),
    subtitle: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    img: new FormControl(''),
    category: new FormControl('', Validators.required)

  });


  constructor(private _newsService: NewsService) { }

  ngOnInit() {
    this.onLoadNews()
  }
  onLoadNews() {
    this.news = this._newsService.onLoadNews();
    this.renderDataTable()
  }
  onSaveNew() {
    if (this._validateTitle()) {
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
  }
  _validateTitle() : boolean {
    let data = this.formNews.value;
    if (data.title.length > data.subtitle.length ){
      Swal.fire("Noticia!", "El campo título no puede ser más largo que el subtítulo!", "error")
      return false;
    }
    return true;
  }
  _confirmSaveNew() {
    let data = this.formNews.value;
    data.img = this.fileUpload;
    delete data.id;
    this._newsService.onSaveNew(data,
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
        Swal.fire('Eliminado!', 'La Noticia ha sido eliminada exitosamente.', 'success')
      },
      () => {
        Swal.fire('Eliminado!', 'La Noticia no ha sido eliminada.', 'error')
      })
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fileUpload = reader.result;
      }
    }
    else {
      this.fileUpload = '';
    }
  }
  onCreateNews() {
    this.isNew = true;
    this.fileUpload = '';
  }
  onPressUpdateNews(News) {
    this.fileUpload = News.img;
    News.img = '';
    this.formNews.patchValue(News);
    this.isNew = false;

  }
  onUpdateNew() {
    Swal.fire({
      text: 'Desea actualizar esta Noticia?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'

    }).then((result) => {
      if (result.value) {
        this._onConfirmUpdate()
      }
    })
  }
  _onConfirmUpdate() {
    let data = this.formNews.value;
    data.img = this.fileUpload;
    this._newsService.onUpdateNews(data,
      () => {
        Swal.fire('Actualización!', 'La Noticia ha sido actualizada exitosamente.', 'success');
        this._onCloseModal();
      },
      () => {
        Swal.fire('Actualización!', 'La Noticia no ha sido actualizada.', 'error')
      })
  }
  renderDataTable() {
    setTimeout(() => {
      this.dataTable = $(this.table.nativeElement);
      this.dataTable.dataTable();
    }, 1000)
  }
}
