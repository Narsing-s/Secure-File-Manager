@Composable
fun HomeScreen(navController: NavController) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {

        Text("VaultFiles", style = MaterialTheme.typography.headlineLarge)

        Button(
            modifier = Modifier.fillMaxWidth(),
            onClick = { navController.navigate("vault") }
        ) {
            Text("🔐 Private Vault")
        }

        Button(
            modifier = Modifier.fillMaxWidth(),
            onClick = { navController.navigate("files") }
        ) {
            Text("📁 All Files")
        }

        Button(
            modifier = Modifier.fillMaxWidth(),
            onClick = { navController.navigate("settings") }
        ) {
            Text("⚙️ Settings")
        }
    }
}

@Preview(showBackground = true)
@Composable
fun HomePreview() {
    HomeScreen(rememberNavController())
}
