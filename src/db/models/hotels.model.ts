import { 
  DataTypes, 
  Model, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional,
} from 'sequelize';

import sequelize from './sequelize'; // Adjust the import path as necessary

// You'll need to import your sequelize instance
// For now, I'll create a placeholder - you should import from your connection file


class Hotel extends Model<InferAttributes<Hotel>, InferCreationAttributes<Hotel>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare address: string;
    declare city: string;
    declare state: string;
    declare country: string;
    declare zip_code: string;
    declare phone_number: string;
    declare email: string;
    declare website: CreationOptional<string>;
    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
    declare rating: CreationOptional<number>;
    declare deleted_at: CreationOptional<Date | null>;
}

// Initialize the model
Hotel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Hotel name is required'
      },
      len: {
        args: [2, 255],
        msg: 'Hotel name must be between 2 and 255 characters'
      }
    }
  },
  address: {
    type: DataTypes.STRING(500),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Address is required'
      }
    }
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'City is required'
      }
    }
  },
  state: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'State is required'
      }
    }
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Country is required'
      }
    }
  },
  zip_code: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'ZIP code is required'
      }
    }
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Phone number is required'
      },
      is: {
        args: /^[+]?[\d\s\-\(\)]+$/,
        msg: 'Invalid phone number format'
      }
    }
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Invalid email format'
      },
      notEmpty: {
        msg: 'Email is required'
      }
    }
  },
  website: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isUrl: {
        msg: 'Invalid website URL format'
      }
    }
  },
  rating: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: true,
    defaultValue: null,
    validate: {
      min: {
        args: [0],
        msg: 'Rating must be between 0 and 5'
      },
      max: {
        args: [5],
        msg: 'Rating must be between 0 and 5'
      }
    }
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  }
}, {
  sequelize,
  tableName: 'Hotels',
  underscored: true,
  timestamps: true,
});

export { Hotel };