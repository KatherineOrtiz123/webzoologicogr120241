import { Component } from '@angular/core';
import { AnimalService } from '../../services/animal.service';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrl: './animal.component.css'
})
export class AnimalComponent {

  animalList: any = [];
  constructor(private animalService: AnimalService,
    private formBuilder: FormBuilder,
    private router :Router,
    private toastr:ToastrService) { }
  getAllAnimals() {
    this.animalService.getAllAnimalsData().subscribe((data: {}) => {
      this.animalList = data;
    });

  }
  ngOnInit() {
    this.getAllAnimals();
  }
  animalForm: any = this.formBuilder.group({
    nombre: '',
    edad: 0,
    tipo: '',
    fecha: Date
  })

newAnimalEntry() {
    this.animalService.newAnimal(localStorage.getItem('accessToken'), this.animalForm.value).subscribe(
      () => {
        //Redirigiendo a la ruta actual /animal y recargando la ventana
        this.router.navigate(['/animal']).then(() => {
          this.newMessage('Registro exitoso');
        })
      }
    );
  }
}
