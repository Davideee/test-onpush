import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from "@angular/core";
import { BehaviorSubject } from "rxjs";

const mySubject = new BehaviorSubject("hello");

@Component({
  selector: "app-root",
  template: `<h1>mySubject: {{ mySubject | async }}</h1>
    <h2>{{ someObject.someProperty }}</h2>
    <a-app></a-app>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  mySubject = mySubject;
  someObject = { someProperty: "my Property" };

  constructor(private cdr: ChangeDetectorRef) {
    setTimeout(() => {
      console.log("setTimeout called");
      mySubject.next("This will be picked :)");
    }, 2000);

    setTimeout(() => {
      console.log("Property changed");
      this.someObject.someProperty = "Juhuu";
      this.cdr.markForCheck();
    }, 3000);
  }
}
