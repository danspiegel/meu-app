import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { AlunosService } from './../services/alunos.service';

interface GithubResponde {
  incomplete_results: boolean,
  items: any[],
  total_number: number
}

@Component({
  selector: 'app-meu-componente',
  templateUrl: './meu-componente.component.html',
  styleUrls: ['./meu-componente.component.css']
})
export class MeuComponenteComponent implements OnInit {

  nome = 'Akira';
  isVisible = false;
  myValue = 3;
  myList = [1,2,3,4,5];

  alunos = [];

  aluno = {
    dados: {
      nome: 'Maria'
    }
  }

  searchText = '';
  projects = [];

  constructor(private alunosService: AlunosService, private http: HttpClient) {
    this.alunos = this.alunosService.getAlunos();
  }

  ngOnInit() {
  }

  getProjects(){
    if (this.searchText){
      const url = `https://api.github.com/search/repositories`;

      const params = new HttpParams().set('q', this.searchText);
      const headers = new HttpHeaders().set('Content-Type','text/html');

      this.http.get<GithubResponde>(url, {params, headers}).subscribe(
        response => {
          this.projects = response.items;
        }
      );
    }
  }

}
