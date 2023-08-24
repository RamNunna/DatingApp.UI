import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Input() usersFromHomeComponent: any;
  @Output() cancelCall = new EventEmitter<boolean>();
  model: any = {};

  constructor(
    private accountService: AccountService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {}

  register() {
    this.accountService.register(this.model).subscribe({
      next: (res) => {
        this.cancel();
      },
      error: (error) => {
        this.toastService.error(error.error);
      },
    });
  }

  cancel() {
    this.cancelCall.emit(true);
    console.log('cancelled');
  }
}
