import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SerieInterface, SeriesService } from '../../services/series.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  series: any[] = [];
  cargando = true;
  error = false;

  constructor(private seriesService: SeriesService) {}

  ngOnInit(): void {
    this.seriesService.getSeries().subscribe(data =>{
      this.series = data;
      this.cargando = false;

    });

    
  }

  
}