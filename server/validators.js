// Validation middleware for posts
const validatePost = (req, res, next) => {
  const { author, caption, image } = req.body;
  const errors = [];

  // Validate author
  if (!author || author.trim() === '') {
    errors.push('Author is required');
  } else if (author.length < 3) {
    errors.push('Author must be at least 3 characters long');
  } else if (author.length > 50) {
    errors.push('Author must not exceed 50 characters');
  }

  // Validate caption
  if (!caption || caption.trim() === '') {
    errors.push('Caption is required');
  } else if (caption.length < 1) {
    errors.push('Caption must be at least 1 character long');
  } else if (caption.length > 2000) {
    errors.push('Caption must not exceed 2000 characters');
  }

  // Validate image
  if (!image || image.trim() === '') {
    errors.push('Image URL is required');
  } else {
    // Basic URL validation
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(image) && !image.startsWith('data:image')) {
      errors.push('Invalid image URL format');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};

// Validation middleware for post updates
const validatePostUpdate = (req, res, next) => {
  const { caption, image } = req.body;
  const errors = [];

  // Caption is optional for update, but if provided must be valid
  if (caption !== undefined) {
    if (caption.trim() === '') {
      errors.push('Caption cannot be empty');
    } else if (caption.length > 2000) {
      errors.push('Caption must not exceed 2000 characters');
    }
  }

  // Image is optional for update, but if provided must be valid
  if (image !== undefined) {
    if (image.trim() === '') {
      errors.push('Image URL cannot be empty');
    } else {
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlPattern.test(image) && !image.startsWith('data:image')) {
        errors.push('Invalid image URL format');
      }
    }
  }

  // At least one field must be provided
  if (caption === undefined && image === undefined) {
    errors.push('At least one field (caption or image) must be provided for update');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};

// Validation middleware for pagination
const validatePagination = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  if (page < 1) {
    return res.status(400).json({
      success: false,
      message: 'Page number must be greater than 0'
    });
  }

  if (limit < 1 || limit > 50) {
    return res.status(400).json({
      success: false,
      message: 'Limit must be between 1 and 50'
    });
  }

  req.pagination = { page, limit };
  next();
};

module.exports = {
  validatePost,
  validatePostUpdate,
  validatePagination
};
