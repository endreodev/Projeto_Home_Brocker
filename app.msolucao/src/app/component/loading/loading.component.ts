import { Component} from '@angular/core';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

  loading = this.loadingService.loading$;
  
  constructor(private loadingService: LoadingService) {}
}