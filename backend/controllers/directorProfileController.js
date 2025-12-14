exports.getDirectorProfile = (req, res) => {
  return res.json({
    success: true,
    user: req.director
  });
};