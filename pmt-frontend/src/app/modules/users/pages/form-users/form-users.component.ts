import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-form-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss']
})
export class FormUsersComponent implements OnInit {
  registerForm!: FormGroup;
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      this.userService.createUser(this.registerForm.value).subscribe({
        next: () => {
          alert('Inscription réussie !');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Erreur inscription :', err);
          alert('Erreur lors de l’inscription.');
        }
      });
    }
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.userService.loginUser(this.loginForm.value).subscribe({
        next: () => {
          alert('Connexion réussie !');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Erreur login :', err);
          alert('Email ou mot de passe incorrect');
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
}
