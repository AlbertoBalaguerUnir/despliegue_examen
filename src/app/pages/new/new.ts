import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new.html',
  styleUrls: ['./new.css']
})
export class NewComponent implements OnInit {
  formulario: FormGroup;
  enviando = false;
  mensajeExito = '';

  constructor(
    private fb: FormBuilder,
    private seriesService: SeriesService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      channel: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(10)]]
    });
  }

  get title() { return this.formulario.get('title'); }
  get channel() { return this.formulario.get('channel'); }
  get rating() { return this.formulario.get('rating'); }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.formulario.invalid) {
      return;
    }

    this.enviando = true;
    this.mensajeExito = '';

    this.seriesService.crear(this.formulario.value).subscribe({
      next: (respuesta: any) => {
        this.mensajeExito = `Serie creada. ID: ${respuesta.id}`;
        this.enviando = false;
        
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Error al crear la serie');
        this.enviando = false;
      }
    });
  }
}