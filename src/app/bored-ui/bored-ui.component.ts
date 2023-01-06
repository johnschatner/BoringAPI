import { Component, OnInit, ElementRef } from '@angular/core';

import { BoredType } from '../bored-response';
import { BoredService } from '../bored.service';

@Component({
  selector: 'app-bored-ui',
  templateUrl: './bored-ui.component.html',
  styleUrls: ['./bored-ui.component.css'],
})
export class BoredUiComponent implements OnInit {
  constructor(private _boredService: BoredService, private elem: ElementRef) {}

  boredResponse: BoredType = { activity: '' }; // Declare it with a sample BoredType response
  boredArray: string[] = []; // This animates the text, works almost the same as above

  showActivity() {
    this._boredService.getActivity().subscribe((data) => {
      // Split the activity string to the words and spaces
      let splitActivityArr = data.activity.split(/(\s+)/);

      // Below is NOT according to the instructions
      // (This method behaves with my animations :D )
      // Assign the newly split array to class attribute
      this.boredArray = splitActivityArr;

      // Below is according to the instructions
      // (This method doesn't behave with my animations)
      // Assign the fetched data to the class attribute
      this.boredResponse = data;
    });
  }

  ngOnInit(): void {
    this.randomBg();
    this.copyToClipboard();
    this.showActivity();
  }

  // Generate a random background!
  letters = '0123456789ABCDEF';
  colorOne: string = '#';
  colorTwo: string = '#';
  gradient: string = '';
  // Random background
  randomBg() {
    const backgroundContainer =
      this.elem.nativeElement.querySelector('.randomBg').style;

    this.colorOne = '#';
    this.colorTwo = '#';
    for (let i = 0; i < 6; i++) {
      this.colorOne += this.letters[Math.floor(Math.random() * 16)];
      this.colorTwo += this.letters[Math.floor(Math.random() * 16)];
    }

    // The animation part
    backgroundContainer.setProperty('--data-opacity', '0');
    backgroundContainer.setProperty('--data-rotation', `0deg`);
    backgroundContainer.setProperty('--data-scale', '4');
    setTimeout(() => {
      backgroundContainer.setProperty('--data-opacity', '1');
      backgroundContainer.setProperty('--data-scale', '3');
      this.gradient = `linear-gradient( 320deg, ${this.colorOne} 29%, ${this.colorTwo} 100% )`;
    }, 1000);
    setTimeout(() => {
      backgroundContainer.setProperty(
        '--data-rotation',
        `${Math.floor(Math.random() * (320 - 270 + 1) + 270)}deg`
      );
    }, 1500);
  }

  // Reflow the animations
  restartAnimation() {
    this.copyToClipboard(); // Reset the old tooltip
    // Fetch previous elements
    const elements = this.elem.nativeElement.querySelectorAll('.activity');
    const reloadBtn = this.elem.nativeElement.querySelector('.btn-refresh');
    // Reverse the animation
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add('fadeOut'); // Trigger fadeOut animation
    }
    reloadBtn.classList.add('preventDefault'); // Remove ability to click
    // Wait 1 sec
    setTimeout(() => {
      // Reset previous elements so they play their animation
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('fadeOut'); // Remove previous fadeOut class
        elements[i].style.animation = 'none';
        elements[i].offsetHeight;
        elements[i].style.animation = null;
      }
      // Run the main function
      this.showActivity();
    }, 1500);
    setTimeout(() => {
      reloadBtn.classList.remove('preventDefault'); // Allow clicks again
    }, 3000);
  }

  copyToClipboard() {
    let copyText = this.boredResponse.activity; // Get the text from the class
    navigator.clipboard.writeText(copyText); // Copy the text to clipboard
  }
}
