import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTableItemComponent } from './task-table-item.component';

describe('TaskTableItemComponent', () => {
  let component: TaskTableItemComponent;
  let fixture: ComponentFixture<TaskTableItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskTableItemComponent]
    });
    fixture = TestBed.createComponent(TaskTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
