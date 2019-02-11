import { Observable } from "rxjs";
import { easingFunctions } from "../easing-functions";

export interface easeOptions {
  easing?: string | ((number) => number),
  ms?: number,
  relativeMs?: boolean,
  interval?: number,
  initial?: number
}

const defaultOptions: easeOptions = {
  easing: "linear",
  ms: 500,
  relativeMs: false,
  interval: 10,
  initial: 0
}

export function ease(options: easeOptions) {

  options = Object.assign({}, defaultOptions, options);

  return <T>(source: Observable<T>) => new Observable<T>(observer => {

    var interval;

    var start: number;
    var target: number;

    var current: any = options.initial;

    source.subscribe(value => {

      if (typeof value !== "number") return observer.next(value);

      start = current;
      target = value;

      const startTime = Date.now();
      const easingFn = typeof options.easing === "string" ? easingFunctions[options.easing] : options.easing;

      if (interval) clearInterval(interval);

      interval = setInterval(() => {

        const pct = easingFn(Math.min(1, (Date.now() - startTime) / (options.relativeMs ? options.ms * Math.abs(start - target) : options.ms)));

        if (pct >= 1) clearInterval(interval);

        current = (1 - pct) * start + pct * target;

        observer.next(current)

      }, options.interval);

    })
  })
}