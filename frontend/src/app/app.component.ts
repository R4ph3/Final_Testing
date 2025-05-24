import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hash = '';
  name = '';
  family = '';
  hashes: any[] = [];
  error = '';

  constructor(private http: HttpClient) {
    this.loadHashes();
  }

  loadHashes() {
    this.http.get<any[]>('http://localhost:3000/api/hashes').subscribe(data => this.hashes = data);
  }

  addHash() {
    this.error = '';
    this.http.post('http://localhost:3000/api/hashes', {
      hash: this.hash.trim(),
      name: this.name.trim(),
      family: this.family.trim()
    }).subscribe({
      next: () => {
        this.hash = '';
        this.name = '';
        this.family = '';
        this.loadHashes();
      },
      error: err => this.error = err.error.error
    });
  }
}