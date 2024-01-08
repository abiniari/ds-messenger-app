import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatBoardComponent } from './chat-board/chat-board.component';

const routes: Routes = [
  {
    path:'',component:ChatBoardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[RouterModule]
})
export class ChatBoardRoutingModule { }
