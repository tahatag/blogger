export async function changeBookmarked(postId: string, bookmarked: boolean) {
  return !bookmarked;
}

export async function changeLiked(postId: string, liked: boolean) {
  return !liked;
}
