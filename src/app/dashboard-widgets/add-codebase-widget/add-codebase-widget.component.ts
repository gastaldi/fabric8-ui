import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Contexts } from 'ngx-fabric8-wit';
import { Subscription } from 'rxjs';
import { Codebase } from '../../space/create/codebases/services/codebase';
import { CodebasesService } from '../../space/create/codebases/services/codebases.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'fabric8-add-codebase-widget',
  templateUrl: './add-codebase-widget.component.html',
  styleUrls: ['./add-codebase-widget.component.less']
})
export class AddCodebaseWidgetComponent implements OnInit, OnDestroy {

  codebases: Codebase[];
  codebaseCount: number;
  contextPath: string;
  contextSubscription: Subscription;
  subscriptions: Subscription[] = [];
  @Output() addToSpace = new EventEmitter();

  constructor(
    private context: Contexts,
    private codebaseService: CodebasesService
  ) {}

  ngOnInit() {
    this.contextSubscription = this.context.current.subscribe(context => {
      this.contextPath = context.path;
      if (context.space) {
        this.codebaseService.getCodebases(context.space.id).subscribe((codebases) => {
          this.codebases = codebases;
          this.codebaseCount = codebases.length;
        });
      }
    });
  }

  ngOnDestroy() {
    this.contextSubscription.unsubscribe();
  }
}
