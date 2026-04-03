@Composable
fun SettingsScreen() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text("⚙️ Settings", style = MaterialTheme.typography.headlineMedium)

        Text("• Change PIN")
        Text("• Enable Decoy Mode")
        Text("• Auto Lock Time")
        Text("• Dark Mode")
    }
}

@Preview(showBackground = true)
@Composable
fun SettingsPreview() {
    SettingsScreen()
}
