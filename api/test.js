module.exports = async (req, res) => {
    const apiKey = process.env.OPENAI_API_KEY;
    
    res.status(200).json({
        hasKey: !!apiKey,
        keyLength: apiKey ? apiKey.length : 0,
        keyPrefix: apiKey ? apiKey.substring(0, 7) + '...' : 'NOT SET',
        nodeVersion: process.version,
        allEnvKeys: Object.keys(process.env).filter(k => k.includes('OPENAI') || k.includes('API'))
    });
};
