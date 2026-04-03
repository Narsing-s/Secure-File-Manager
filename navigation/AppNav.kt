@Composable
fun AppNav() {
    val navController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = "lock"
    ) {
        composable("lock") { LockScreen(navController) }
        composable("home") { HomeScreen(navController) }
        composable("vault") { VaultScreen() }
        composable("files") { FilesScreen() }
        composable("settings") { SettingsScreen() }
    }
}
