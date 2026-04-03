@Composable
fun FilesScreen() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp)
    ) {
        Text("📁 All Files", style = MaterialTheme.typography.headlineMedium)

        Spacer(Modifier.height(16.dp))

        Text("• Documents")
        Text("• Images")
        Text("• Videos")
        Text("• Audio")
    }
}

@Preview(showBackground = true)
@Composable
fun FilesPreview() {
    FilesScreen()
}
