import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from "@angular/core";
import { BehaviorSubject } from "rxjs";

const mySubject = new BehaviorSubject("hello");

@Component({
  selector: "a-app",
  template: `<h1>mySubject: {{ mySubject | async }}</h1>
    <h2>{{ someObject.someProperty }}</h2>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AComponent {
  mySubject = mySubject;
  someObject = { someProperty: "my Property" };

  constructor(private cdr: ChangeDetectorRef) {
    setTimeout(() => {
      console.log("setTimeout called");
      mySubject.next("This will be picked :)");
    }, 5000);

    setTimeout(() => {
      console.log("Property changed");
      this.someObject.someProperty = "Juhuu";
      this.cdr.markForCheck();
    }, 6000);
  }
}
