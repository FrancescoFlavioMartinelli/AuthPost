import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Post } from './models/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {

  constructor(private http:HttpClient, private authSrv:AuthService){}

  getPosts() {
    return this.http.get<Post[]>(this.authSrv.url+"/posts");
  }

  getPost(id: number) {
    return this.http.get<Post>(this.authSrv.url+"/posts/"+id);
  }

  updatePost(data: Partial<Post>, id: number) {
    return this.http.patch(this.authSrv.url+"/posts/"+id, data);
  }
}
