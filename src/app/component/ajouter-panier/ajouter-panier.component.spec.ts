import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterPanierComponent } from './ajouter-panier.component';

describe('AjouterPanierComponent', () => {
  let component: AjouterPanierComponent;
  let fixture: ComponentFixture<AjouterPanierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterPanierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterPanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
