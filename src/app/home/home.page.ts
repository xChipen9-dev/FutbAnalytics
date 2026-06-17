import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonText
} from '@ionic/angular/standalone';

import { BaseChartDirective } from 'ng2-charts';
import {
  ChartConfiguration,
  ChartData,
  ChartOptions,
  RadarController,
  LineController,
  BarController,
  DoughnutController,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Legend,
  Tooltip,
  Chart
} from 'chart.js';

import { LISTADO_JUGADORES, JugadorStats } from '../models/jugador.model';

Chart.register(
  RadarController,
  LineController,
  BarController,
  DoughnutController,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Legend,
  Tooltip
);

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BaseChartDirective,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonText
  ]
})
export class HomePage implements OnInit {

  jugadores: JugadorStats[] = LISTADO_JUGADORES;

  categorias = ['Vel', 'Tiro', 'Pase', 'Regate', 'Defensa', 'Físico', 'Visión', 'Técnica'];
  meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];

  jugador1Id = '1';
  jugador2Id = '3';
  equipoIds: string[] = ['1', '3', '5', '8'];

  private historialSeleccionados: JugadorStats[] = [];

  radarChartType: 'radar' = 'radar';
  lineChartType: 'line' = 'line';
  barChartType: 'bar' = 'bar';
  doughnutChartType: 'doughnut' = 'doughnut';

  radarChartData: ChartData<'radar'> = {
    labels: this.categorias,
    datasets: []
  };

  lineChartData: ChartData<'line'> = {
    labels: this.meses,
    datasets: []
  };

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  doughnutChartData: ChartData<'doughnut'> = {
    labels: this.categorias,
    datasets: []
  };

  radarChartOptions: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          backdropColor: 'transparent'
        },
        pointLabels: {
          color: '#eaf7ef',
          font: {
            size: 12,
            weight: 'bold'
          }
        },
        grid: {
          color: 'rgba(255,255,255,0.10)'
        },
        angleLines: {
          color: 'rgba(255,255,255,0.10)'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#ffffff'
        }
      }
    }
  };

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: '#ffffff'
        },
        grid: {
          color: 'rgba(255,255,255,0.08)'
        }
      },
      y: {
        beginAtZero: true,
        suggestedMax: 10,
        ticks: {
          color: '#ffffff'
        },
        grid: {
          color: 'rgba(255,255,255,0.08)'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#ffffff'
        }
      }
    }
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: '#ffffff'
        },
        grid: {
          color: 'rgba(255,255,255,0.08)'
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#ffffff'
        },
        grid: {
          color: 'rgba(255,255,255,0.08)'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#ffffff'
        }
      }
    }
  };

  doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff'
        }
      }
    }
  };

  ngOnInit(): void {
    this.registrarEnHistorial(this.getJugadorById(this.jugador1Id));
    this.registrarEnHistorial(this.getJugadorById(this.jugador2Id));
    this.updateAllCharts();
  }

  getJugadorById(id: string): JugadorStats | undefined {
    return this.jugadores.find(j => j.id === id);
  }

  onDueloChange(): void {
    const jugador1 = this.getJugadorById(this.jugador1Id);
    const jugador2 = this.getJugadorById(this.jugador2Id);

    if (jugador1) this.registrarEnHistorial(jugador1);
    if (jugador2) this.registrarEnHistorial(jugador2);

    this.updateAllCharts();
  }

  onEquipoChange(): void {
    if (this.equipoIds.length > 4) {
      this.equipoIds = this.equipoIds.slice(0, 4);
    }
    this.updateAllCharts();
  }

  

  updateAllCharts(): void {
    this.updateRadarChart();
    this.updateLineChart();
    this.updateBarChart();
    this.updateDoughnutChart();
  }

  private updateRadarChart(): void {
    const jugador1 = this.getJugadorById(this.jugador1Id);
    const jugador2 = this.getJugadorById(this.jugador2Id);

    this.radarChartData = {
      ...this.radarChartData,
      labels: [...this.categorias],
      datasets: [
        {
          data: jugador1 ? [...jugador1.stats] : [],
          label: jugador1?.nombre ?? 'Jugador 1',
          fill: true,
          backgroundColor: 'rgba(46, 204, 113, 0.25)',
          borderColor: '#2ecc71',
          pointBackgroundColor: '#2ecc71',
          pointBorderColor: '#2ecc71',
          pointHoverBackgroundColor: '#ffffff',
          pointHoverBorderColor: '#2ecc71'
        },
        {
          data: jugador2 ? [...jugador2.stats] : [],
          label: jugador2?.nombre ?? 'Jugador 2',
          fill: true,
          backgroundColor: 'rgba(241, 196, 15, 0.20)',
          borderColor: '#f1c40f',
          pointBackgroundColor: '#f1c40f',
          pointBorderColor: '#f1c40f',
          pointHoverBackgroundColor: '#ffffff',
          pointHoverBorderColor: '#f1c40f'
        }
      ]
    };
  }

  private updateLineChart(): void {
    const jugador1 = this.getJugadorById(this.jugador1Id);
    const jugador2 = this.getJugadorById(this.jugador2Id);

    this.lineChartData = {
      ...this.lineChartData,
      labels: [...this.meses],
      datasets: [
        {
          data: this.generarHistorialAleatorio(),
          label: jugador1?.nombre ?? 'Jugador 1',
          tension: 0.35,
          borderColor: '#2ecc71',
          backgroundColor: 'rgba(46, 204, 113, 0.20)',
          pointBackgroundColor: '#2ecc71',
          pointBorderColor: '#2ecc71',
          fill: false
        },
        {
          data: this.generarHistorialAleatorio(),
          label: jugador2?.nombre ?? 'Jugador 2',
          tension: 0.35,
          borderColor: '#f1c40f',
          backgroundColor: 'rgba(241, 196, 15, 0.20)',
          pointBackgroundColor: '#f1c40f',
          pointBorderColor: '#f1c40f',
          fill: false
        }
      ]
    };
  }

  private updateBarChart(): void {
    this.barChartData = {
      ...this.barChartData,
      labels: this.historialSeleccionados.map(j => j.nombre),
      datasets: [
        {
          data: this.historialSeleccionados.map(j => this.calcularIndiceRendimiento(j.stats)),
          label: 'Índice de Rendimiento',
          backgroundColor: [
            '#2ecc71',
            '#27ae60',
            '#1abc9c',
            '#f1c40f',
            '#e67e22'
          ]
        }
      ]
    };
  }

  private updateDoughnutChart(): void {
    const equipo = this.jugadores.filter(j => this.equipoIds.includes(j.id));
    const acumulado = new Array(this.categorias.length).fill(0);

    equipo.forEach(jugador => {
      jugador.stats.forEach((valor, index) => {
        acumulado[index] += valor;
      });
    });

    this.doughnutChartData = {
      ...this.doughnutChartData,
      labels: [...this.categorias],
      datasets: [
        {
          data: acumulado,
          label: 'Potencia total del equipo',
          backgroundColor: [
            '#2ecc71',
            '#27ae60',
            '#1abc9c',
            '#16a085',
            '#f1c40f',
            '#f39c12',
            '#e67e22',
            '#d35400'
          ]
        }
      ]
    };
  }

  private generarHistorialAleatorio(): number[] {
    return Array.from({ length: 6 }, () => Math.floor(Math.random() * 11));
  }

  private calcularIndiceRendimiento(stats: number[]): number {
    return stats.reduce((acc, valor) => acc + valor, 0);
  }

  private registrarEnHistorial(jugador?: JugadorStats): void {
    if (!jugador) return;

    this.historialSeleccionados.unshift(jugador);

    const vistos = new Set<string>();
    this.historialSeleccionados = this.historialSeleccionados.filter(item => {
      if (vistos.has(item.id)) return false;
      vistos.add(item.id);
      return true;
    });

    this.historialSeleccionados = this.historialSeleccionados.slice(0, 5);
  }
}