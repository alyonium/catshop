export interface Image {
  id: string;
  width: number;
  height: number;
  url: string;
}

export interface Cat {
  id: string;
  name: string;
  temperament: string;
  description: string;
  origin: string;
  image?: Image;
}

export interface CartState {
  items: Cat[];
}
