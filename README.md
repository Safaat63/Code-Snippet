Code snippet- save, edit, and delete.
- ✍️ Create new code snippets 
- 📝 Edit existing snippets
- 💾 Save and organize snippets
- 🗑️ Delete snippets you no longer need

model Snippet {
  id    Int    @id @default(autoincrement())
  title String
  code  String
}
