import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailComponent {
  userId: number | null = null;
  user: User | null = null;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (err) => {
          console.error('Erreur chargement utilisateur :', err);
        }
      });
    }
  }
}
