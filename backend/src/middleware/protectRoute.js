export const protectRoute = [
    requireAuth(),
    async (req, res, next) => {
        try {
            const clerkId = req.auth().userId;

            if (!clerkId) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            let user = await User.findOne({ clerkId });

            // 🔑 FALLBACK CREATION (fixes race condition)
            if (!user) {
                user = await User.create({
                    clerkId,
                    email: req.auth().sessionClaims?.email,
                    userName: req.auth().sessionClaims?.name || "User",
                    profilePicture: req.auth().sessionClaims?.picture || "",
                });

                // optional but recommended
                await upsertStreamUser({
                    id: clerkId.toLowerCase(),
                    name: user.userName,
                    image: user.profilePicture,
                });
            }

            req.user = user;
            next();
        } catch (error) {
            console.error("protectRoute error:", error);
            return res.status(500).json({ message: "Server Error" });
        }
    },
];
