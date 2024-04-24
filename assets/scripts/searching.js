// Function to perform a flexible string search
function flexibleSearch(query, target) {
    // Convert both query and target to lowercase for case-insensitive matching
    const queryLower = query.toLowerCase();
    const targetLower = target.toLowerCase();

    // Check if the target contains the entire query as a substring
    if (targetLower.includes(queryLower)) {
        return 1.0;
    }

    // Check if any substring of the target closely matches the query using fuzzy matching
    const targetWords = targetLower.split(/\s+/); // Split target into words
    const queryWords = queryLower.split(/\s+/);   // Split query into words

    let highestSim = 0;

    for (const queryWord of queryWords) {
        for (const targetWord of targetWords) {
            // Use a fuzzy matching algorithm (e.g., Levenshtein distance) to determine similarity
            const similarity = computeSimilarity(queryWord, targetWord);
            if (similarity >= highestSim) { // Adjust the threshold as needed
                highestSim = similarity;
            }
        }
    }

    return highestSim;
}

// Function to compute similarity between two words (e.g., using Levenshtein distance)
function computeSimilarity(word1, word2) {
    // Example: Levenshtein distance
    const dp = Array.from({ length: word1.length + 1 }, (_, i) => i);
    for (let i = 1; i <= word2.length; i++) {
        let prev = dp[0]++;
        for (let j = 1; j <= word1.length; j++) {
            const temp = dp[j];
            dp[j] = word1[j - 1] === word2[i - 1] ? prev : Math.min(prev + 1, Math.min(dp[j] + 1, dp[j - 1] + 1));
            prev = temp;
        }
    }
    return 1 - dp[word1.length] / Math.max(word1.length, word2.length);
}

function flexSearchQuestObject(query, obj) {
    return Math.max(flexibleSearch(query, obj.questTopic), flexibleSearch(query, obj.questName), flexibleSearch(query, obj.description), flexibleSearch(query, obj.location));
}

// Function to serialize an object into a string
function serializeObject(obj) {
    try {
        return JSON.stringify(obj);
    } catch (error) {
        console.error("Error while serializing object:", error);
        return null;
    }
}

// Function to deserialize a string into an object
function deserializeString(str) {
    try {
        return JSON.parse(str);
    } catch (error) {
        console.error("Error while deserializing string:", error);
        return null;
    }
}