import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';

import { LoggingService } from './logging.service';


//INJECTION DE DEPENDANCES : on e vut pas le prog de faire des news {on ne sait pas combien d'instane aura lieu }
@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  constructor(private loggingService:LoggingService,
    private http: HttpClient) {}

  assignments: Assignment[] = [];
  URI = "http://localhost:8010/api/assignments"
  /* Cette méthode retourne un Observable qui contient
     un tableau d'assignments Observable<Assignment[]>
    On devra le consommer avec un subscribe() */
  getAssignments(): Observable<Assignment[]> {
    //on envoie une requete http get pour recuperer les assignments
   return  this.http.get<Assignment[]> (this.URI);

  }
//get assignement by id 
  getAssignment(id:number):Observable<Assignment|undefined> {
   return this.http.get<Assignment>(this.URI + "/" + id);
  }

  /* Cette méthode ajoute un assignment au tableau
      et retourne un Observable qui contient une string
      qui indique que tout s'est bien passé */
  addAssignment(a: Assignment):Observable<any> {
    // on génére un id aléatoire pour l'assignment
    a.id = Math.floor(Math.random() * 100000000000000000);

    this.assignments.push(a);
    this.loggingService.log(a.nom, "ajouté");
    return this.http.post<Assignment>(this.URI, a)
    
  
  }

  updateAssignment(a: Assignment):Observable<any> {
    // Pour le moment on n'a pas vraiment fait de modifications
    // on a juste mis rendu=true sur une référence à un
    // objet du tableau...

    // Plus tard on enverra une requête AJAX PUT vers un web service
    this.loggingService.log(a.nom, "modifié");
    return this.http.put<Assignment>(this.URI, a);
    //return of("Assignment modifié");
  }

  deleteAssignment(a:Assignment):Observable<any> {
    // on supprime l'assignment envoyé par le fils dans le tableau
    //this.assignments.splice(this.assignments.indexOf(a), 1);

    return this.http.delete<Assignment>(this.URI + "/" + a._id);
    

   // return of("Assignment supprimé");
  }
}
