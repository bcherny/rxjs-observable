import {Subscription} from './Subscription'

/** OPERATOR INTERFACES */

export type FactoryOrValue<T> = T | (() => T)

export interface Timestamp<T> {
  value: T
  timestamp: number
}

export interface TimeInterval<T> {
  value: T
  interval: number
}

/** SUBSCRIPTION INTERFACES */

export interface Unsubscribable {
  unsubscribe(): void
}

export type TeardownLogic = Unsubscribable | Function | void

export interface SubscriptionLike extends Unsubscribable {
  unsubscribe(): void
  readonly closed: boolean
}

export type SubscribableOrPromise<T> =
  | Subscribable<T>
  | Subscribable<never>
  | PromiseLike<T>
  | InteropObservable<T>

/** OBSERVABLE INTERFACES */

export interface Subscribable<T> {
  subscribe(
    observerOrNext?: PartialObserver<T> | ((value: T) => void),
    error?: (error: any) => void,
    complete?: () => void
  ): Unsubscribable
}

export type ObservableInput<T> =
  | SubscribableOrPromise<T>
  | ArrayLike<T>
  | Iterable<T>

/** @deprecated use {@link InteropObservable } */
export type ObservableLike<T> = InteropObservable<T>

export type InteropObservable<T> = {
  [Symbol.observable]: () => Subscribable<T>
}

/** OBSERVER INTERFACES */

export interface NextObserver<T> {
  closed?: boolean
  next: (value: T) => void
  error?: (err: any) => void
  complete?: () => void
}

export interface ErrorObserver<T> {
  closed?: boolean
  next?: (value: T) => void
  error: (err: any) => void
  complete?: () => void
}

export interface CompletionObserver<T> {
  closed?: boolean
  next?: (value: T) => void
  error?: (err: any) => void
  complete: () => void
}

export type PartialObserver<T> =
  | NextObserver<T>
  | ErrorObserver<T>
  | CompletionObserver<T>

export interface Observer<T> {
  closed?: boolean
  next: (value: T) => void
  error: (err: any) => void
  complete: () => void
}

/** SCHEDULER INTERFACES */

export interface SchedulerLike {
  now(): number
  schedule<T>(
    work: (this: SchedulerAction<T>, state?: T) => void,
    delay?: number,
    state?: T
  ): Subscription
}

export interface SchedulerAction<T> extends Subscription {
  schedule(state?: T, delay?: number): Subscription
}
