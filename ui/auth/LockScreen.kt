@Composable
fun LockScreen(navController: NavController) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text("🔐 App Locked", style = MaterialTheme.typography.headlineMedium)

        Spacer(Modifier.height(20.dp))

        Button(onClick = {
            navController.navigate("home") {
                popUpTo("lock") { inclusive = true }
            }
        }) {
            Text("Unlock (Demo)")
        }
    }
}

@Preview(showBackground = true)
@Composable
fun LockPreview() {
    LockScreen(rememberNavController())
}
