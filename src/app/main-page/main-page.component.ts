import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  restTime = 2;
  workTime = 5;

  duration = 0;

  workCount = 0;
  restCount = 0;

  whatIDo!: 'work' | 'rest' | 'paused' | undefined;

  workcon = 0;

  interval!: NodeJS.Timeout;

  constructor(private toastr: ToastrService) {}
  ngOnInit(): void {}

  startWorkTime() {
    if (this.workcon == 0) {
      this.duration =
        (this.whatIDo == 'paused' ? this.duration : this.workTime) * 60;
      this.workcon++;
    } else {
      this.duration = this.whatIDo == 'paused' ? this.duration : this.workTime;
    }
    this.whatIDo = 'work';

    this.interval = setInterval(() => {
      if (this.duration > 0) {
        this.duration--;

        this.workCount++;
      }

      if (this.duration == 0) {
        clearInterval(this.interval);

        this.startRestTime();
      }
    }, 1000);
  }

  startRestTime() {
    this.duration =
      (this.whatIDo == 'paused' ? this.duration : this.restTime) * 60;
    this.whatIDo = 'rest';
    this.interval = setInterval(() => {
      if (this.duration > 0) {
        this.duration--;

        this.restCount++;
      }
      if (this.duration == 0) {
        clearInterval(this.interval);

        this.startWorkTime();
      }
    }, 1000);
  }
  pauseWork() {
    clearInterval(this.interval);
    this.whatIDo = 'paused';
  }

  showResult() {
    this.pauseWork();

    const workTime = this.getDurationToMinute(this.workCount);
    const restTime = this.getDurationToMinute(this.restCount);

    const result = `Toplam çalışma zamanı => ${workTime}, Toplam dinlenme zamanı => ${restTime}`;

    alert(result);
  }

  /**
   *
   * @param duration seconds
   */
  getDurationToMinute(duration: number) {
    const minute = ~~((duration % 3600) / 60);

    const seconds = ~~duration % 60;

    return `${minute}:${seconds}`;
  }

  reset() {
    this.restCount = 0;
    this.workCount = 0;
    this.duration = 0;
    this.whatIDo = undefined;
  }
}
