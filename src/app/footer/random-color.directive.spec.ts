import { async, TestBed, inject } from '@angular/core/testing';
import { Component, Directive, ElementRef } from '@angular/core';
import { RandomColorDirective } from './random-color.directive';

export class MockElementRef extends ElementRef {
  nativeElement = {
    style: { color: '' }
  };
  constructor() { super(null); }
}

describe('RandomColorDirective', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ElementRef, useClass: MockElementRef }
      ]
    }).compileComponents();
  }));

  it('should create an instance', inject([ElementRef], (el: ElementRef) => {
    const directive = new RandomColorDirective(el);
    expect(directive).toBeTruthy();
  }));
});
