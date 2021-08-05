import { CoursesService } from "./../services/courses.service";
import { Component, OnInit } from "@angular/core";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { interval, noop, Observable, of, throwError, timer } from "rxjs";
import {
  catchError,
  delay,
  delayWhen,
  filter,
  finalize,
  map,
  retryWhen,
  shareReplay,
  tap,
} from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CourseDialogComponent } from "../course-dialog/course-dialog.component";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  // we push observable data to the video instead of pushing the data
  // we use aync pipe in the view to subscribe to the observable
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private coursesService: CoursesService,
    
  ) {}

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {
    // use $ to represent it is observable type

    const courses$ = this.coursesService
      .loadAllCourses()
      .pipe(map((courses) => courses.sort(sortCoursesBySeqNo)));

     
    this.beginnerCourses$ = courses$.pipe(
      map((courses) =>
        courses.filter((courses) => courses.category == "BEGINNER")
      )
    );
    this.advancedCourses$ = courses$.pipe(
      map((courses) =>
        courses.filter((courses) => courses.category == "ADVANCED")
      )
    );
  }

  
}
