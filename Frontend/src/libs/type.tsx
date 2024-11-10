
export type registerForm = {
    full_name : string,
    email : string,
    password : string
}

export type editProfileForm = {
  id : number
  photo_profile?: string,
  full_name : string,
  username : string,
  bio : string,
  follower: number,
  following: number
}


export type passwordForm = {
  email : string
}

export type resetForm = {
  password : string,
  c_password : string
}

export type loginForm = {
    email : string,
    password : string
}

export type threadsForm = {
    content : string,
    image : File | null
}

export type repliesForm = {
  content : string,
  image : File | null
}

export type users = {
    isFollowed?: boolean,
    id: number,
    username: string,
    full_name: string
    email: string,
    password: string,
    photo_profile: string,
    bio: string,
    created_at: Date,
    created_by: string,
    updated_at: Date,
    updated_by: string
}

export type likes = {
    id         : number
    user_id    : number
    thread_id  : number
    created_at : Date
    created_by : string
    update_at  : Date 
    updated_by : string
  }

export type likeMap = {
  user_id    : number
}

export type replyMap = {
  user_id    : number
}

export type thread = {
    id: number,
    image: string,
    content: string,
    number_of_replies: number,
    updated_by: number,
    created_at: Date,
    update_at: Date,
    created_by: number,
    users: users,
    likes: likeMap[],
    replies : replyMap[],
    isLiked : boolean,
    isReplied: boolean,
    isUser: boolean
}

export type repliesParent = {
  id: number,
  image: string,
  content: string,
  parent_id: number,
  number_of_replies: number,
  updated_by: number,
  created_at: Date,
  updated_at: Date,
  created_by: number,
  users: users,
  likesreplies: likeMap[],
  replies : replyMap[],
  isLiked : boolean,
  isReplied: boolean,
  isUser: boolean,
  repliesCount : number
}

export type userReplies = {
  id: number
  full_name: string,
  username: string,
  photo_profile: string,
}

export type likesReplies = {
  id         : number
  user_id    : number
  reply_id  : number
  created_at : Date
  created_by : string
  update_at  : Date 
  updated_by : string
}


export type replies = {
  id: number,
  user_id: number,
  thread_id: number,
  image?: string,
  content: string,
  created_at: Date,
  created_by: number,
  updated_at: Date,
  updated_by: number,
  users: userReplies,
  likesreplies : likesReplies,
  isUser: boolean,
  likesCount : number,
  repliesCount : number,
  isReplied : boolean,
  isLiked : boolean
}


export type threadProfile = {
  id: number,
  image: string,
  content: string,
  number_of_replies: number,
  updated_by: number,
  created_at: Date,
  update_at: Date,
  created_by: number
  likes: likes[]
}

export type following = {
  id         : number,
  followed_id    : number,
  follower_id  : number,
  created_at : Date,
  update_at  : Date,
  followed      : users
  follower    : users
}

export type suggested = {
    id         : number,
    followed_id    : number,
    follower_id  : number,
    created_at : Date,
    update_at  : Date,
    follower    : follower,
    isFollowed: boolean
  }

  export type follower = {
    full_name: string,
    username: string,
    photo_profile: string,
  }