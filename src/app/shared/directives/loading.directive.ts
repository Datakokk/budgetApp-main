import { Directive, ElementRef, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Directive({
  selector: '[appLoading]'
})
export class LoadingDirective {

    @Input() appLoading: any;
    sending: boolean = false;

    constructor(private authService: AuthService,
                private elementRef: ElementRef) { }

    ngOnInit() {
        this.authService.getSending()
                        .subscribe(data => {
                            this.sending = data.sending;
                            if (this.sending) {
                                if(this.appLoading.showLoading) {
                                    this.elementRef.nativeElement.style.display = this.appLoading.display;
                                } else {
                                    this.elementRef.nativeElement.style.display = 'none';
                                }
                            } else {
                                if(this.appLoading.showLoading) {
                                    this.elementRef.nativeElement.style.display = 'none';
                                } else {
                                    this.elementRef.nativeElement.style.display = this.appLoading.display;
                                }
                            }
                        })
    }

}
